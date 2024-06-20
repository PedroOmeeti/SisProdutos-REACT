import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.components.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Button, Input } from 'reactstrap';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    // Essa função é chamada quando o usuário clica em login:
    const processaLogin = async () => {
        try {
            // A URL deve apontar para o endpoint de autenticação do usuário:
            const response = await fetch('http://localhost:3010/usuarios/login', {
                method: 'POST',
                headers: {
                    // Verifique se o content-type está correto para ser enviado ao endpoint
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"email": username, "senha": password }),
                
            });
            const data = await response.json();
            
            // Supondo que a API retorna um token de acesso
            const token = data.token;
            
            if(!token) {
                throw new Error('Token de acesso ausente ou expirado');
            } else {
                // Armazenar o token de forma segura, por exemplo, em localStorage
                localStorage.setItem('token', token);
                // Redirecionar para a página protegida
                navigate('/painel');
            }
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
            // Da forma que preferir, exiba na tela uma mensagem de erro caso a senha/usuário estejam incorretos;
            // Utilize o sweetalert, caso prefira.
        }
    };
    return (
        <div className="login-container">
            <div className="login-glass-effect">
                <h2 className='text-white text-center'>Login</h2>
                <form onSubmit={e => {
                    e.preventDefault();
                    processaLogin();
                }}>
                    <FormGroup>

                        <Input
                            className="mt-3"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            type="email"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Input className="mt-3"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button className='btn-primary mt-3' type='submit'>
                            Entrar
                        </Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}

export default Login;
