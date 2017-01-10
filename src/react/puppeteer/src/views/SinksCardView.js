/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import SinkInfoView from './SinkInfoView';

function SinksCardView(props) {
    const accordionId = "accordionSink";
    return (
        <div id={accordionId}
             role="tablist"
             aria-multiselectable="false">
            {props.activeDevice.get('sinks').map(sink => (
                <SinkInfoView key={sink.get('id')}
                              accordion={accordionId}
                              sink={sink}
                              {...props}
                />
            ))}
        </div>
    );
}

export default SinksCardView;