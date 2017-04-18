/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import $ from 'jquery';

/**
 * Checks that the destination device (the one being streamed to) has
 * an appropriate 'module-native-protocol-tcp' open. If not, send an
 * ajax request to the destination's puppet node to open said port.
 *
 * @param destDevice The device object from this application's state
 * tree representing the destination (stream-to) device.
 * @param callback A lambda to execute upon determining that the
 * destination device already has a port open OR to pass as the
 * "done" callback for the ajax request to open the port.
 */
function checkDest(destDevice, callback) {

  // Check that 'module-native-protocol-tcp' is open on "destDevice".
  const destOpen = destDevice.get('modules').map(m => m.get('name')).includes('module-native-protocol-tcp');

  if (destOpen) {
    callback({status: "Check"});
  } else {
    $.ajax({
      url: destDevice.get('host') + '/v1/gates',
      method: 'POST',
      contentType: 'application/json',
      accepts: 'application/json',
      data: { port: 4141 },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Basic " + btoa("nick:something"));
      },
      error: (jqXHR) => {
        console.log("Ajax error: " + jqXHR.status);
      }
    }).done(callback);
  }
}

function getServer(host) {
  if (host.match(/.+:\d+/)) {
    return host.split(':')[0];
  }
  return host;
}

/**
 * Loads a tunnel module on the "srcDevice" which connects
 * to the "destSinkId' sink on the "destDevice" puppet device.
 *
 * @param destDevice The device object that will be streamed to.
 * @param destSinkId The sink id on "destDevice" to stream to.
 * @param srcDevice The device that connects to "destDevice".
 */
export default function createTunnel(destDevice, destSinkId, srcDevice) {

  const host = srcDevice.get('host');
  const server = getServer(host) + ':4141';

  /*
   * Checks that the destination device has a port open for connecting
   * a tunnel to, then opens a tunnel on the source device to that
   * port.
   */
  checkDest(destDevice, (checkDestData) => {

    /*
     * If the returned data from the "checkDest" call (i.e. the incoming
     * "data" parameter from the ajax "done" callback) indicates that
     * we've successfully opened/found an open port on the destination
     * device, then proceed to open the tunnel from the source device.
     */
    if (!!checkDestData) {
      $.ajax({
        url: srcDevice.get('host') + '/v1/tunnels',
        method: 'POST',
        contentType: 'application/json',
        accepts: 'application/json',
        data: {
          name: destDevice.get('name'),
          server: server,
          sink: destSinkId,
        },
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Basic " + btoa("nick:something"));
        },
        error: (jqXHR) => {
          console.log("Ajax error: " + jqXHR.status);
        }
      }).done((data) => {
        console.log("Created tunnel! Got:");
        console.log(data);
      });
    }
  });
}
