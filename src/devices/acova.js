const exposes = require('../lib/exposes');
const fz = require('../converters/fromZigbee');
const tz = require('../converters/toZigbee');
const reporting = require('../lib/reporting');
const e = exposes.presets;

module.exports = [
    {
        zigbeeModel: ['PERCALE2 D1.00P1.01Z1.00', 'PERCALE2 D1.00P1.02Z1.00', 'PERCALE2 D1.00P1.03Z1.00'],
        model: 'PERCALE2',
        vendor: 'Acova',
        description: 'Percale 2 heater',
        fromZigbee: [fz.thermostat, fz.hvac_user_interface],
        toZigbee: [
            tz.thermostat_local_temperature,
            tz.thermostat_system_mode,
            tz.thermostat_occupied_heating_setpoint,
            tz.thermostat_unoccupied_heating_setpoint,
            tz.thermostat_occupied_cooling_setpoint,
            tz.thermostat_running_state,
        ],
        exposes: [
            exposes.climate()
                .withSetpoint('occupied_heating_setpoint', 7, 28, 0.5)
                .withSetpoint('unoccupied_heating_setpoint', 7, 28, 0.5)
                .withLocalTemperature()
                .withSystemMode(['off', 'heat', 'auto'])
                .withRunningState(['idle', 'heat']),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat']);
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatRunningState(endpoint);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatUnoccupiedHeatingSetpoint(endpoint);
        },
    },
    {
        zigbeeModel: ['ALCANTARA2 D1.00P1.01Z1.00\u0000\u0000\u0000\u0000\u0000\u0000',
            'ALCANTARA2 D1.00P1.02Z1.00\u0000\u0000\u0000\u0000\u0000\u0000'],
        model: 'ALCANTARA2',
        vendor: 'Acova',
        description: 'Alcantara 2 heater',
        fromZigbee: [fz.thermostat, fz.hvac_user_interface],
        toZigbee: [
            tz.thermostat_local_temperature,
            tz.thermostat_system_mode,
            tz.thermostat_occupied_heating_setpoint,
            tz.thermostat_unoccupied_heating_setpoint,
            tz.thermostat_running_state,
        ],
        exposes: [
            exposes.climate()
                .withSetpoint('occupied_heating_setpoint', 7, 28, 0.5)
                .withSetpoint('unoccupied_heating_setpoint', 7, 28, 0.5)
                .withLocalTemperature()
                .withSystemMode(['off', 'heat', 'auto'])
                .withRunningState(['idle', 'heat']),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat']);
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatRunningState(endpoint);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatUnoccupiedHeatingSetpoint(endpoint);
        },
    },
    {
        zigbeeModel: ['TAFFETAS2 D1.00P1.02Z1.00', 'TAFFETAS2 D1.00P1.01Z1.00'],
        model: 'TAFFETAS2',
        vendor: 'Acova',
        description: 'Taffetas 2 heater',
        fromZigbee: [fz.thermostat, fz.hvac_user_interface, fz.occupancy],
        toZigbee: [
            tz.thermostat_local_temperature,
            tz.thermostat_system_mode,
            tz.thermostat_occupied_heating_setpoint,
            tz.thermostat_unoccupied_heating_setpoint,
            tz.thermostat_running_state,
            tz.thermostat_local_temperature_calibration,
        ],
        exposes: [
            exposes.climate()
                .withSetpoint('occupied_heating_setpoint', 7, 28, 0.5)
                .withSetpoint('unoccupied_heating_setpoint', 7, 28, 0.5)
                .withLocalTemperature()
                .withSystemMode(['off', 'heat', 'auto'])
                .withRunningState(['idle', 'heat'])
                .withLocalTemperatureCalibration('local_temperature_calibration'),
            e.occupancy(),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat']);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msOccupancySensing']);
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatRunningState(endpoint);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatUnoccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatTemperatureCalibration(endpoint);
            await reporting.occupancy(endpoint2);
        },
    },
];
