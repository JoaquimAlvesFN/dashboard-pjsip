import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import socket from './socket-io';

import './Endpoint.css';

const Endpoint = ({endpoints}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://172.17.0.2:8089/ari/endpoints', {
            params: {
                api_key: 'asterisk:asterisk'
            }
        }).then(res => {
            dispatch({
                type: 'LOADINITIAL',
                payload: res.data
            })
        }).catch(err => console.log(err))
        
    }, []);

    socket.on('peerstatus', (data) => {
        let peerStr = data.Peer;
        let resourceStr = data.Peer;

        let obj = endpoints.find(o => o.resource === resourceStr.slice(6));
        let obj2 = endpoints.indexOf(obj);


        endpoints.splice(obj2, 1, {
            channel_ids: [],
            resource: resourceStr.slice(6),
            state: data.PeerStatus == 'Reachable' ? 'online' : 'offline',
            technology: peerStr.slice(0 ,5)
        });

        dispatch({
            type: 'MUTATION',
            ramais: endpoints
        })

    });
    
    
    return(
        <div className="grid">
            {
                endpoints.map(endpoint => (
                    <div className="groupCard" key={endpoint.resource}>
                        <div className={[endpoint.state == 'online' ? "card-online" : "card"]}>
                            <div>
                                <p>Ramal: {endpoint.resource}</p>
                                <p>Estado: {endpoint.state}</p>
                            </div>
                            <div>
                                <p>Tecnologia: {endpoint.technology}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
   );
}

const mapStateToProps = (state) => {
    return {
        endpoints: state.data,
    }
}

export default connect(mapStateToProps)(Endpoint);
