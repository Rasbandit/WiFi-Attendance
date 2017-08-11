const express = require('express'),
  Client = require('ssh2').Client;

let MacAdresses = [];
let conn = new Client();

conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec('show clients', { pty: true }, function(err, stream) {
    if (err) throw err;
    stream.on('close', function(code, signal) {
      stream.end('ls -l\nexit\n');
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      console.log
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
  
}).connect({
  host: '192.168.0.24',
  port: 22,
  username: '****',
  password: '****',
  // debug: console.log,
  algorithms: {
    cipher : [
      'aes128-ctr','aes192-ctr','aes256-ctr','arcfour256','arcfour128',
                'aes128-cbc','3des-cbc','blowfish-cbc','cast128-cbc','aes192-cbc',
                'aes256-cbc','arcfour'],
    hmac: ['hmac-sha2-256', 'hmac-sha2-512', 'hmac-sha1', 'hmac-sha1-96']
}
});
