import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { NotFound } from 'http-errors';
import sensors from '../data/sensors.json';
import chart_stats from '../data/home_page_chart.json';
import device_events from '../data/events.json';
import device_logs from '../data/logs.json';
import weekly_avg_events from '../data/weekle-average-temp.json';
import weekly_temps from '../data/weekly-temps.json';
import {
  contentDeleteResponseSchema,
  contentIdSchema,
  deviceEventSchema,
  genericFilterSchema,
  sensorListSchema,
  sensorLogSchema,
  sensorSchema,
  sensorUpdateSchema,
  statsSchema,
  weeklyAvgTemps,
  weeklyTempsSchema,
} from '../schemas';
import { getChunk, getNextId, getPagination } from '../utils';
import { Sensor, SensorPayload } from '../../index';

const listSensors = {
  schema: {
    description: 'Returns list of sensors',
    tags: ['sensors'],
    response: {
      200: sensorListSchema,
    },
    querystring: genericFilterSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Querystring: { page: number } }>
  ) {
    const { page = 1 } = request.query;
    const data = getChunk(sensors, 25);
    const { previousPage, nextPage, pages } = getPagination(data.length, page);

    if (page - 1 > data.length) {
      return {
        result: [],
        paging: null,
      };
    }

    return {
      results: data[page - 1] ?? [],
      paging: {
        nextPage,
        previousPage,
        pageSize: 25,
        pages,
        currentPage: page,
        count: sensors.length,
      },
    };
  },
};

const getSensor = {
  schema: {
    description: 'Returns a single sensor',
    tags: ['sensors'],
    response: {
      200: {
        result: sensorSchema,
      },
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string } }>
  ) {
    const { id } = request.params;
    const device = sensors.find((c: Sensor) => c.device_id === id);

    if (!device) {
      throw new NotFound('Sensor not found');
    }

    return {
      result: {
        ...device,
        overview: {
          total_messages: 1340,
          down_time: 67,
          alerts: 74,
        },
      },
    };
  },
};

const updateSensor = {
  schema: {
    description: 'Updates a sensor in place',
    tags: ['sensors'],
    response: {
      200: {
        result: sensorSchema,
      },
    },
    params: contentIdSchema,
    body: sensorUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string }; Body: SensorPayload }>
  ) {
    const { id } = request.params;
    const device = sensors.find((c: Sensor) => c.device_id === id);

    if (!device) {
      throw new NotFound('Sensor not found');
    }

    const updatedSensor = {
      ...device,
      ...request.body,
    };
    // replace the company with the new one
    sensors.splice(sensors.indexOf(device), 1, updatedSensor);

    return {
      result: updatedSensor,
    };
  },
};

const createSensor = {
  schema: {
    description: 'Creates a new sensor',
    tags: ['sensors'],
    response: {
      201: {
        result: sensorSchema,
      },
    },
    body: sensorUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Body: SensorPayload }>,
    reply: FastifyReply
  ) {
    const id = getNextId();

    const device: Sensor = {
      ...request.body,
      device_id: id,
    };

    sensors.unshift(device);

    return reply.code(201).send({ result: device });
  },
};

const deleteSensor = {
  schema: {
    description: 'Updates a sensor in place',
    tags: ['sensors'],
    response: {
      204: contentDeleteResponseSchema,
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string }; Body: SensorPayload }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    // remove company from companies
    sensors.splice(
      sensors.findIndex((c: Sensor) => c.device_id === parseInt(id)),
      1
    );

    return reply.code(204).send({ result: true });
  },
};

const stats = {
  schema: {
    description: 'Chart Stats',
    tags: ['sensors'],
    response: {
      200: statsSchema,
    },
  },
  handler: async function () {
    return { results: chart_stats };
  },
};

const sensorEvents = {
  schema: {
    description: 'Device Events',
    tags: ['sensors'],
    response: {
      200: deviceEventSchema,
    },
  },
  handler: async function () {
    return { results: device_events };
  },
};

const sensorLogs = {
  schema: {
    description: 'Device logs',
    tags: ['sensors'],
    response: {
      200: sensorLogSchema,
    },
  },
  handler: async function () {
    return { results: device_logs };
  },
};

const weeklyAverageTemps = {
  schema: {
    description: 'Daily average temps for the week.',
    tags: ['sensors'],
    response: {
      200: weeklyAvgTemps,
    },
  },
  handler: async function () {
    return { results: weekly_avg_events };
  },
};

const weeklyTemps = {
  schema: {
    description: "This Week's daily temperatures for the sensor.",
    tags: ['sensors'],
    response: {
      200: weeklyTempsSchema,
    },
  },
  handler: async function () {
    return { results: weekly_temps };
  },
};

export default async function sensorRoutes(fastify: FastifyInstance) {
  // list companies
  fastify.get('', listSensors);
  fastify.post('', createSensor);
  fastify.get('/stats', stats);
  fastify.get('/:id', getSensor);
  fastify.get('/:id/events', sensorEvents);
  fastify.get('/:id/logs', sensorLogs);
  fastify.get('/:id/stats/weekly', weeklyTemps);
  fastify.get('/:id/stats/weekly_avg', weeklyAverageTemps);
  fastify.put('/:id', updateSensor);
  fastify.delete('/:id', deleteSensor);
}
