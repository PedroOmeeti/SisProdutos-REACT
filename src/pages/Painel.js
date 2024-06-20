import React, { useEffect, useState } from 'react';
import './Painel.components.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Table, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useJwt, isExpired } from 'react-jwt';

function Painel() {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt(token);
    const [itens, setItens] = useState([])
    useEffect(() => {
        
        if(isExpired) {
            navigate('/');
            return;
        } else {
            async function obterDados() {
                console.log(token)
                fetch('http://localhost:3010/produtos/listar',{
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `${token}`
                      },                      
                }
                ).then(
                    resposta => resposta.json()
                ).then(
                    dados => setItens(dados.resultado)
                )
            }
            obterDados();
            console.log("show")
        }
        
    },[isExpired, token])
    return (
        <div className="main-container">
            <div className="painel-glass-effect">
                <Row>
                    <Col><h2 className='text-white text-center'>Painel Administrativo - Produtos</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered dark hover responsive striped className='mt-3'>
                            <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Nome</th>
                                    <th>Fabricante</th>
                                    <th>Estoque</th>
                                    <th>Cod. Barras</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itens.map(item => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.nome}</td>
                                        <td>{item.fabricante}</td>
                                        <td>{item.estoque}</td>
                                        <td>{item.cod_barras}</td>
                                        <td>{item.preco}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Painel;