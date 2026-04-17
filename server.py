#!/usr/bin/env python3
"""
Servidor HTTP simples para a aplicação Tecfind
Permite testar a aplicação com suporte a Firebase local storage
"""

import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Adicionar headers para permitir CORS e acesso ao localStorage
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"""
╔═══════════════════════════════════════════════════════════╗
║          SERVIDOR TECFIND INICIADO COM SUCESSO           ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Abra seu navegador em: http://localhost:{PORT}            ║
║                                                           ║
║  Diretório: {DIRECTORY}           ║
║                                                           ║
║  Para parar o servidor, pressione CTRL + C              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
""")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServidor encerrado.")
