/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import ModuleInfoView from './ModuleInfoView';

function ModulesCardView(props) {
    const accordionId = "accordionModules";
    return (
        <div id={accordionId}
             role="tablist"
             aria-multiselectable="false">
            {props.activeDevice.get('modules').map(module => (
                <ModuleInfoView key={module.get('id')}
                                accordion={accordionId}
                                module={module}
                                {...props}
                />
            ))}
        </div>
    );
}

export default ModulesCardView;
