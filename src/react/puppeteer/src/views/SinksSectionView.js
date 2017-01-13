/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import SinkInfoView from './SinkCardView';

function SinksCardView(props) {
    return (
        <div className="col-md-12">
            <div className="section-header">
                <h3><a data-toggle="collapse" href="#sinkCard">Sinks ({props.activeDevice.get('sinks').size})</a></h3>
            </div>
            <div id="sinkCard" className="collapse in">
                <div className="card-group">
                    {props.activeDevice.get('sinks').map(sink => (
                        <div className="col-md-4">
                            <SinkInfoView key={sink.get('id')}
                                          sink={sink}
                                          {...props}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SinksCardView;