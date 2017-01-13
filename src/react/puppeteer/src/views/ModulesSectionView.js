/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import ModuleCardView from './ModuleCardView';

function ModulesCardView(props) {
    return (
        <div className="col-md-12">
            <div className="section-header">
                <h3><a data-toggle="collapse" href="#moduleCard">Modules ({props.activeDevice.get('modules').size})</a></h3>
            </div>
            <div id="moduleCard" className="collapse in">
                <div className="card-deck">
                    {props.activeDevice.get('modules').map(module => (
                        <div className="col-md-3">
                            <ModuleCardView key={module.get('id')}
                                            module={module}
                                            {...props}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ModulesCardView;
