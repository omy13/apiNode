const express = require('express');
const Device = require('../model/device');
const cors = require('cors');

const app = express();

app.put('/device/:udid', function(req, res) {
    let udid = req.params.udid;
    let body = req.body;

    Device.findOneAndUpdate({udid: udid}, body, (error, deviceDB) =>{
        if(error){
            res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            deviceDB
        });
    });
});

app.get('/devices', function(req, res) {
    //let udid = req.params.udid;

    let page = req.query.page || 0;
    let devices = req.query.devices || 5;
    page = Number(page);
    devices = Number(devices);

    Device.find({})
        .skip(page)
        .limit(devices)
        .exec((error, devices) =>{
        if(error){
            res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            devices
        });
    });

});

app.get('/device/:udid', function(req, res) {
    let udid = req.params.udid;

    Device.find({
        platformVersion: udid
    })
        .exec((error, devices) =>{
            if(error){
                res.status(400).json({
                    ok: false,
                    error
                })
            }
            res.json({
                ok: true,
                devices
            });
        });

});

app.post('/devices', function(req, res) {
    let body = req.body;
    let device = new Device({
        name: body.name,
        udid: body.udid,
        platformVersion: body.platformVersion,
        inUse: body.inUse
    });

    device.save( (error, deviceDB)=>{
        if(error){
            res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            device: deviceDB
        })
    });
});

module.exports = app;
