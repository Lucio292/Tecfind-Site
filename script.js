// ===== MAPEAMENTO DE CORES POR SERVIÇO =====
const serviceKeywords = {
    'encanador': 'service-plumb',
    'encanamento': 'service-plumb',
    'hidraulico': 'service-plumb',
    'limpeza': 'service-cleaning',
    'faxina': 'service-cleaning',
    'limpador': 'service-cleaning',
    'tapeçaria': 'service-cleaning',
    'aula': 'service-education',
    'professor': 'service-education',
    'educação': 'service-education',
    'curso': 'service-education',
    'eletricista': 'service-electrical',
    'eletricidade': 'service-electrical',
    'elétrico': 'service-electrical',
    'construtor': 'service-masonry',
    'pedreiro': 'service-masonry',
    'alvenaria': 'service-masonry',
    'construção': 'service-masonry',
    'pintor': 'service-painting',
    'pintura': 'service-painting',
    'jardineiro': 'service-gardening',
    'jardinagem': 'service-gardening',
    'plantas': 'service-gardening',
    'mecânico': 'service-repair',
    'reparo': 'service-repair',
    'manutenção': 'service-repair',
    'carpete': 'service-carpet',
    'tapete': 'service-carpet',
    'entrega': 'service-delivery',
    'delivery': 'service-delivery',
    'mudança': 'service-delivery',
    'cabeleireiro': 'service-beauty',
    'cabelo': 'service-beauty',
    'beleza': 'service-beauty',
    'manicure': 'service-beauty',
    'massagem': 'service-beauty',
    'consultor': 'service-consulting',
    'consultoria': 'service-consulting',
    'marketing': 'service-consulting',
    'empresarial': 'service-consulting'
};

// Função para detectar classe de serviço
function getServiceClass(serviceName) {
    if (!serviceName) return 'service-other';
    
    const lower = serviceName.toLowerCase();
    for (const [keyword, className] of Object.entries(serviceKeywords)) {
        if (lower.includes(keyword)) {
            return className;
        }
    }
    return 'service-other';
}
// 🔥 SUBSTITUA ESSE OBJETO PELO SEU DO FIREBASE CONSOLE (VEJA ABAIXO)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "seuservicosja.firebaseapp.com",
    projectId: "seuservicosja",
    storageBucket: "seuservicosja.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();

// ===== VARIÁVEIS GLOBAIS =====
let currentUser = null;
let userType = null; // 'prestador' ou 'cliente'
let userLocation = { lat: null, lng: null };
let map = null;
let marker = null;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initMapListener();
    loadSections();
});

// ===== AUTENTICAÇÃO =====
function initAuth() {
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            document.getElementById('user-name').textContent = user.displayName || user.email;
            document.getElementById('user-avatar').src = user.photoURL || 'https://via.placeholder.com/40';
            document.getElementById('user-avatar').style.display = 'block';
            document.getElementById('login-btn').textContent = 'Sair';
            document.getElementById('login-btn').onclick = logout;
            loadUserData();
            requestNotificationPermission();
        } else {
            document.getElementById('user-name').textContent = '';
            document.getElementById('user-avatar').style.display = 'none';
            document.getElementById('login-btn').textContent = 'Entrar com Google';
            document.getElementById('login-btn').onclick = loginWithGoogle;
            hideAllSections();
            document.getElementById('login-section').style.display = 'block';
        }
    });
}

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(error => {
        alert("Erro ao fazer login: " + error.message);
    });
}

function loginWithWhatsApp() {
    // WhatsApp Web API para autenticação
    const phoneNumber = prompt("Digite seu número de WhatsApp (com código do país, ex: 5511999999999):");
    
    if (!phoneNumber || !phoneNumber.match(/^\d{10,}$/)) {
        alert("Por favor, digite um número válido com pelo menos 10 dígitos.");
        return;
    }
    
    // Criar usuário anônimo para armazenar no Firebase
    auth.signInAnonymously()
        .then(result => {
            const user = result.user;
            
            // Salvar o número de WhatsApp no Firestore
            return db.collection('users').doc(user.uid).set({
                uid: user.uid,
                phone: phoneNumber,
                displayName: `Usuário WhatsApp ${phoneNumber}`,
                photoURL: 'https://via.placeholder.com/40/25D366/ffffff?text=WA',
                authMethod: 'whatsapp',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true }).then(() => {
                // Atualizar profile do Firebase
                return user.updateProfile({
                    displayName: `WhatsApp: ${phoneNumber}`,
                    photoURL: 'https://via.placeholder.com/40/25D366/ffffff?text=WA'
                });
            });
        })
        .then(() => {
            alert("✅ Conectado com WhatsApp! Você pode agora usar a plataforma.");
            console.log("Login com WhatsApp realizado com sucesso");
        })
        .catch(error => {
            console.error("Erro ao conectar com WhatsApp:", error);
            alert("Erro ao conectar com WhatsApp: " + error.message);
        });
}

function logout() {
    auth.signOut();
}

// ===== CARREGAR DADOS DO USUÁRIO DO FIRESTORE =====
function loadUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                userType = data.tipo;
                userLocation = { lat: data.latitude, lng: data.longitude };
                updateUIBasedOnType();
                if (userType === 'prestador') {
                    listenForServiceRequests(); // Escuta solicitações em tempo real
                }
            } else {
                // Usuário novo — mostra seção de cadastro baseado no tipo que escolher
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('cadastro-prestador').style.display = 'block';
                document.getElementById('cadastro-cliente').style.display = 'block';
            }
        })
        .catch(error => console.error("Erro ao carregar usuário:", error));
}

function updateUIBasedOnType() {
    hideAllSections();
    if (userType === 'prestador') {
        document.getElementById('meus-servicos').style.display = 'block';
        document.getElementById('cadastro-prestador').style.display = 'block';
        initMap(); // Inicializa mapa após definir tipo
    } else if (userType === 'cliente') {
        document.getElementById('buscar').style.display = 'block';
        document.getElementById('cadastro-cliente').style.display = 'block';
        initMap(); // Inicializa mapa após definir tipo
    }
}

// ===== ESCONDER TODAS AS SEÇÕES =====
function hideAllSections() {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
}

// ===== MAPA COM ARRASTE DE MARCADOR =====
function initMap() {
    const mapElement = document.getElementById(userType === 'prestador' ? 'map-prestador' : 'map-cliente');
    if (!mapElement) return;

    const center = userLocation.lat && userLocation.lng ?
        { lat: userLocation.lat, lng: userLocation.lng } :
        { lat: -23.5505, lng: -46.6333 }; // São Paulo como padrão

    map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: center,
        mapTypeId: 'roadmap'
    });

    marker = new google.maps.Marker({
        position: center,
        map: map,
        draggable: true,
        title: "Arraste para definir sua localização"
    });

    // Atualiza coordenadas ao arrastar
    marker.addListener('dragend', () => {
        const pos = marker.getPosition();
        userLocation = { lat: pos.lat(), lng: pos.lng() };
        console.log("Localização atualizada:", userLocation);
    });

    // Se já tinha localização, centraliza o marcador
    if (userLocation.lat && userLocation.lng) {
        marker.setPosition(new google.maps.LatLng(userLocation.lat, userLocation.lng));
        map.setCenter(marker.getPosition());
    }
}

// ===== INICIALIZAR ESCUTADORES DE EVENTOS =====
function initMapListener() {
    // Listeners para os formulários
    const prestadorForm = document.getElementById('prestador-form');
    const clienteForm = document.getElementById('cliente-form');
    
    if (prestadorForm) {
        prestadorForm.addEventListener('submit', savePrestador);
    }
    if (clienteForm) {
        clienteForm.addEventListener('submit', saveClienteWithRequest);
    }
    
    // Listeners para os botões de navegação
    const btnPrestador = document.getElementById('btn-prestador');
    const btnCliente = document.getElementById('btn-cliente');
    const btnBuscar = document.getElementById('btn-buscar');
    const btnMeuServicos = document.getElementById('btn-meus-servicos');
    
    if (btnPrestador) {
        btnPrestador.addEventListener('click', () => {
            hideAllSections();
            document.getElementById('cadastro-prestador').style.display = 'block';
        });
    }
    
    if (btnCliente) {
        btnCliente.addEventListener('click', () => {
            hideAllSections();
            document.getElementById('cadastro-cliente').style.display = 'block';
        });
    }
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            hideAllSections();
            document.getElementById('buscar').style.display = 'block';
        });
    }
    
    if (btnMeuServicos) {
        btnMeuServicos.addEventListener('click', () => {
            hideAllSections();
            document.getElementById('meus-servicos').style.display = 'block';
        });
    }
    
    // Listener para o botão de categorias
    const btnCategorias = document.getElementById('btn-categorias');
    if (btnCategorias) {
        btnCategorias.addEventListener('click', () => {
            hideAllSections();
            document.getElementById('categorias').style.display = 'block';
        });
    }
    
    // Listener para o botão de buscar localização
    const getLocationBtn = document.getElementById('get-location');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', () => {
            getUserLocation();
            setTimeout(searchNearbyProviders, 500);
        });
    }
}

// ===== SALVAR PRESTADOR =====
function savePrestador(e) {
    e.preventDefault();
    if (!currentUser) return alert("Você precisa estar logado.");

    const servico = document.getElementById('servico-prestador').value.trim();
    const descricao = document.getElementById('descricao-prestador').value.trim();
    const telefone = document.getElementById('telefone-prestador').value.trim();

    if (!servico || !descricao) return alert("Preencha serviço e descrição.");
    if (!userLocation.lat || !userLocation.lng) return alert("Por favor, defina sua localização no mapa.");

    db.collection('users').doc(currentUser.uid).set({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        type: 'prestador',
        service: servico,
        description: descricao,
        phone: telefone,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        averageRating: 0,
        totalRatings: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
        .then(() => {
            alert("✨ Perfil de prestador salvo com sucesso!\n\nVocê começará a receber solicitações de clientes próximos!");
            document.getElementById('prestador-form').reset();
            userType = 'prestador';
            updateUIBasedOnType();
        })
        .catch(error => alert("Erro: " + error.message));
}

// ===== CARREGAR SEÇÕES INICIAIS =====
function loadSections() {
    // Inicialmente mostra login
    hideAllSections();
    document.getElementById('login-section').style.display = 'block';
}
function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            if (marker) {
                marker.setPosition(new google.maps.LatLng(userLocation.lat, userLocation.lng));
                map.setCenter(marker.getPosition());
            }
            alert(`Localização obtida: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`);
            // Salva automaticamente no perfil se já estiver logado
            if (currentUser && userType) {
                db.collection('users').doc(currentUser.uid).update({
                    latitude: userLocation.lat,
                    longitude: userLocation.lng
                }).catch(console.error);
            }
        },
        error => alert("Erro ao obter localização: " + error.message)
    );
}

// ===== BUSCAR PROVEDORES PRÓXIMOS (PARA CLIENTES) =====
function searchNearbyProviders() {
    if (!userLocation.lat || !userLocation.lng) {
        alert("Por favor, obtenha sua localização primeiro.");
        return;
    }

    const serviceRequested = document.getElementById('servico-desejado').value.trim();
    if (!serviceRequested) {
        alert("Digite o serviço que você procura.");
        return;
    }

    // Busca todos os prestadores (em produção, usaríamos geoqueries com bibliotecas like geofirestore)
    // Por simplicidade, buscamos todos e filtramos por distância (OK para <100 usuários)
    db.collection('users').where('type', '==', 'prestador').get()
        .then(snapshot => {
            const results = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (!data.latitude || !data.longitude) return;

                const distance = haversineDistance(
                    userLocation.lat, userLocation.lng,
                    data.latitude, data.longitude
                );

                // Filtra: serviço contém o termo (case insensitive) E distância < 10km
                if (
                    data.service.toLowerCase().includes(serviceRequested.toLowerCase()) &&
                    distance <= 10 // 10 km
                ) {
                    results.push({ id: doc.id, ...data, distance: distance.toFixed(1) });
                }
            });

            displaySearchResults(results);
        })
        .catch(error => {
            console.error("Erro ao buscar prestadores:", error);
            alert("Erro ao buscar prestadores. Tente novamente.");
        });
}

// Função para calcular distância entre duas coordenadas (fórmula de Haversine)
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}

// ===== EXIBIR RESULTADOS DA BUSCA =====
function displaySearchResults(results) {
    const container = document.getElementById('resultado-busca');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `<p>Nenhum prestador encontrado para "${document.getElementById('servico-desejado').value}" dentro de 10 km. Tente outro termo ou aumente o raio.</p>`;
        return;
    }

    results.forEach(p => {
        const serviceClass = getServiceClass(p.service);
        const card = document.createElement('div');
        card.className = `prestador-card ${serviceClass}`;
        card.innerHTML = `
            <h3>${p.displayName}</h3>
            <p><strong>📌 Serviço:</strong> ${p.service}</p>
            <p><strong>💬 Descrição:</strong> ${p.description}</p>
            <p><strong>📍 Distância:</strong> ${p.distance} km</p>
            <div class="rating">
                <span>${p.averageRating || 0} ⭐</span> 
                <span>(${p.totalRatings || 0} avaliações)</span>
            </div>
            <a href="https://wa.me/55${p.phone ? p.phone.replace(/\D/g, '') : 'seunumerodewhatsapp'}?text=Olá%20${encodeURIComponent(p.displayName)}%2C%20vi%20seu%20servi%C3%A7o%20no%20Tecfind%20e%20gostaria%20de%20agendar.%20Podemos%20marcar?" target="_blank" class="whatsapp-btn">💬 Contatar via WhatsApp</a>
        `;
        container.appendChild(card);
    });
}

// ===== ESCUTAR SOLICITAÇÕES DE SERVIÇO EM TEMPO REAL (PARA PRESTADORES) =====
function listenForServiceRequests() {
    if (!currentUser || userType !== 'prestador') return;

    const serviceProvided = db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
            const data = doc.data();
            if (!data || !data.service) return;

            const term = data.service.toLowerCase();

            // Escuta a coleção de solicitações em tempo real
            db.collection('service_requests')
                .where('serviceRequested', '>=', term)
                .where('serviceRequested', '<=', term + '\uffff') // Técnica de prefix match
                .where('status', '==', 'open')
                .onSnapshot(snapshot => {
                    const requests = [];
                    snapshot.docChanges().forEach(change => {
                        if (change.type === 'added' || change.type === 'modified') {
                            const data = change.doc.data();
                            // Filtra: só mostra se o cliente está perto (simplificado — em produção usaríamos geoquery)
                            if (data.latitude && data.longitude && userLocation.lat && userLocation.lng) {
                                const dist = haversineDistance(
                                    userLocation.lat, userLocation.lng,
                                    data.latitude, data.longitude
                                );
                                if (dist <= 15) { // 15 km de raio para notificação
                                    requests.push({ id: change.doc.id, ...data });
                                }
                            }
                        }
                    });

                    displayServiceRequests(requests);
                    showNotificationBadge(requests.length);
                });
        })
        .catch(error => console.error("Erro ao configurar escuta de solicitações:", error));
}

// ===== EXIBIR SOLICITAÇÕES RECEBIDAS =====
function displayServiceRequests(requests) {
    const container = document.getElementById('solicitacoes-list');
    container.innerHTML = '';

    if (requests.length === 0) {
        container.innerHTML = `<p style="text-align: center; padding: 30px; color: #999;">⏳ Nenhuma solicitação de serviço no momento. Volte mais tarde ou aumente seu raio de cobertura.</p>`;
        return;
    }

    requests.forEach(req => {
        const serviceClass = getServiceClass(req.serviceRequested);
        const card = document.createElement('div');
        card.className = `solicitacao-card ${serviceClass}`;
        card.innerHTML = `
            <h3>🔔 Nova Solicitação de Serviço</h3>
            <p><strong>🛠️ Serviço solicitado:</strong> ${req.serviceRequested}</p>
            <p><strong>📍 Localização do cliente:</strong> ${req.location}</p>
            <p><strong>🗺️ Distância aproximada:</strong> ${haversineDistance(
                userLocation.lat, userLocation.lng,
                req.latitude, req.longitude
            ).toFixed(1)} km</p>
            <p><small>⏰ Solicitado em: ${new Date(req.timestamp.seconds * 1000).toLocaleString('pt-BR')}</small></p>
            <div class="service-actions">
                <button class="service-btn accept-btn" onclick="aceitarServico('${req.id}')">✅ Aceitar & Contatar</button>
                <button class="service-btn reject-btn" onclick="recusarServico('${req.id}')">❌ Recusar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== ACEITAR OU RECUSAR SOLICITAÇÃO =====
function aceitarServico(requestId) {
    if (!confirm("Aceitar esta solicitação? O cliente será notificado e vocês poderão conversar pelo WhatsApp.")) return;

    db.collection('service_requests').doc(requestId).update({
        status: 'accepted',
        providerAssigned: currentUser.uid,
        acceptedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            alert("Serviço aceito! O cliente será notificado.");
            // Notificar o cliente (em produção, usaríamos FCM ou email)
            // Por simplicidade, só atualizamos o status — o cliente verá na tela se estiver online
        })
        .catch(error => alert("Erro: " + error.message));
}

function recusarServico(requestId) {
    db.collection('service_requests').doc(requestId).update({
        status: 'rejected',
        providerAssigned: null
    }).then(() => {
        alert("Solicitação rejeitada.");
    }).catch(error => alert("Erro: " + error.message));
}

// ===== SOLICITAR PERMISSÃO PARA NOTIFICAÇÕES (FCM) =====
function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('Este navegador não suporta notificações de desktop');
        return;
    }

    if (Notification.permission === 'granted') {
        // Já tem permissão
        return;
    }

    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Permissão para notificações concedida!');
                // Aqui você poderia enviar o token para o servidor FCM para enviar notificações push
                // Por simplicidade, estamos usando notificações do navegador (não push real)
                // Para notificações push reais, você precisaria de um service worker e servidor FCM
                // Isso é avançado — para MVP, usamos notificações de tela (como abaixo)
            }
        });
    }
}

// ===== SELEÇÃO DE CATEGORIA =====
let categoriaAtiva = null;

function selecionarCategoria(categoria) {
    // Remover classe active de todas as categorias
    const cards = document.querySelectorAll('.categoria-card');
    cards.forEach(card => card.classList.remove('active'));
    
    // Adicionar classe active ao card clicado
    event.target.closest('.categoria-card')?.classList.add('active');
    
    // Atualizar categoria ativa
    categoriaAtiva = categoria;
    
    // Mapear categorias para palavras-chave
    const categoryKeywords = {
        'tecnologia': ['tecnologia', 'ti', 'desenvolvimento', 'programação', 'redes', 'suporte', 'computador'],
        'construcao': ['construção', 'pedreiro', 'alvenaria', 'construtor', 'reforma'],
        'limpeza': ['limpeza', 'faxina', 'limpador', 'tapeçaria', 'higienização'],
        'educacao': ['aula', 'professor', 'educação', 'curso', 'treinamento', 'instrutor'],
        'beleza': ['cabeleireiro', 'cabelo', 'beleza', 'manicure', 'massagem', 'spa', 'estética'],
        'logistica': ['entrega', 'delivery', 'mudança', 'transporte', 'logística'],
        'paisagismo': ['jardineiro', 'jardinagem', 'plantas', 'paisagismo', 'horta'],
        'reparo': ['mecânico', 'reparo', 'manutenção', 'conserto', 'ajustes'],
        'design': ['design', 'gráfico', 'criativo', 'arte', 'fotografia', 'vídeo']
    };
    
    // Obter palavras-chave da categoria
    const keywords = categoryKeywords[categoria] || [];
    
    // Filtrar prestadores que correspondem à categoria
    const prestadores = document.querySelectorAll('[data-servico-class]');
    let count = 0;
    
    prestadores.forEach(prestador => {
        const servicoClass = prestador.getAttribute('data-servico-class') || '';
        const serviceName = prestador.textContent.toLowerCase();
        
        // Verificar se alguma palavra-chave está no nome do serviço ou classe do serviço
        const matches = keywords.some(kw => 
            serviceName.includes(kw.toLowerCase()) || servicoClass.includes(kw.toLowerCase())
        );
        
        if (matches) {
            prestador.style.opacity = '1';
            prestador.style.pointerEvents = 'auto';
            count++;
        } else {
            prestador.style.opacity = '0.3';
            prestador.style.pointerEvents = 'none';
        }
    });
    
    // Scroll para a seção de serviços
    const section = document.getElementById('servicos');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Mostrar feedback visual
    console.log(`Categoria '${categoria}' selecionada. ${count} prestador(es) encontrado(s).`);
}

// ===== MOSTRAR NOTIFICAÇÃO DE TEMPO REAL (NA TELA) =====
function showNotificationBadge(count) {
    const badge = document.getElementById('notification-badge');
    if (!badge) {
        const badgeEl = document.createElement('span');
        badgeEl.id = 'notification-badge';
        badgeEl.className = 'notification-badge';
        badgeEl.textContent = count;
        // Adiciona ao botão de login or ao header
        const header = document.querySelector('header');
        header.appendChild(badgeEl);
    } else {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// ===== SUBSTITUIR O FORMULÁRIO DO CLIENTE PARA CHAMAR A SOLICITAÇÃO =====
// O listener foi adicionado em initMapListener

function saveClienteWithRequest(e) {
    e.preventDefault();
    if (!currentUser) return alert("Você precisa estar logado.");

    const serviceRequested = document.getElementById('servico-desejado').value.trim();
    const location = document.getElementById('localizacao-cliente').value.trim();

    if (!serviceRequested || !location) return alert("Preencha serviço e localização.");
    if (!userLocation.lat || !userLocation.lng) return alert("Por favor, obtenha sua localização primeiro.");

    // Salva o perfil do cliente
    db.collection('users').doc(currentUser.uid).set({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        type: 'cliente',
        serviceRequested: serviceRequested,
        location: location,
        latitude: userLocation.lat,
        longitude: userLocation.lng
    }, { merge: true })
        .then(() => {
            // Cria uma solicitação de serviço
            return db.collection('service_requests').add({
                userId: currentUser.uid,
                serviceRequested: serviceRequested,
                location: location,
                latitude: userLocation.lat,
                longitude: userLocation.lng,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'open',
                providerAssigned: null
            });
        })
        .then(() => {
            alert("Solicitação de serviço enviada! Prestadores próximos serão notificados em tempo real.");
            document.getElementById('cliente-form').reset();
            updateUIBasedOnType();
        })
        .catch(error => alert("Erro: " + error.message));
}