export const paginationSchema = {
  description: 'Pagination',
  properties: {
    count: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
    enabled: {
      type: 'boolean',
    },
    lastPage: {
      type: 'number',
    },
    nextPage: {
      type: ['number', 'null'],
    },
    pageSize: {
      type: 'number',
    },
    pages: {
      items: {
        type: 'number',
      },
      type: 'array',
    },
    previousPage: {
      type: ['number', 'null'],
    },
  },
  type: 'object',
};

export const genericFilterSchema = {
  description: 'Generic filter',
  properties: {
    page: {
      type: 'number',
    },
  },
  type: 'object',
};

export const contentIdSchema = {
  description: 'Generic content Id',
  properties: {
    id: {
      type: 'string',
    },
  },
  type: 'object',
};

// Sensor
export const sensorSchema = {
  description: 'Single Sensor',
  type: 'object',
  properties: {
    device_id: {
      type: 'string',
    },
    last_online: {
      type: 'string',
    },
    last_temp: {
      type: 'number',
    },
    customer: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    overview: {
      type: 'object',
      properties: {
        total_messages: {
          type: 'number',
        },
        down_time: {
          type: 'number',
        },
        alerts: {
          type: 'number',
        },
      },
    },
  },
};

export const contentDeleteResponseSchema = {
  description: 'Content delete response',
  type: 'object',
  properties: {
    result: {
      type: 'boolean',
    },
  },
};

export const sensorUpdateSchema = {
  description: 'Update Sensor',
  type: 'object',
  properties: {
    customer: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    min_temp_limit: {
      type: 'number',
    },
    monitor_min_temp: {
      type: 'boolean',
    },
    max_temp_limit: {
      type: 'number',
    },
    monitor_max_temp: {
      type: 'boolean',
    },
  },
};

export const sensorListSchema = {
  description: 'List of sensors',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: sensorSchema,
    },
    paging: paginationSchema,
  },
};

export const statsSchema = {
  description: 'Stats Schema',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          stats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: {
                  type: 'string',
                },
                temp: {
                  type: 'number',
                },
              },
            },
          },
          device_id: {
            type: 'string',
          },
        },
      },
    },
    paging: paginationSchema,
  },
};

export const deviceEventSchema = {
  description: 'List events for the sensor',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          event_name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          time: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const weeklyAvgTemps = {
  description: 'List of weekly average temps',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sensor_id: {
            type: 'string',
          },
          stats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: { type: 'string' },
                temp: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
};

export const weeklyTempsSchema = {
  description: 'List weekly temperature',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          time: { type: 'string' },
          temp: { type: 'number' },
        },
      },
    },
  },
};
export const sensorLogSchema = {
  description: 'List of sensor logs',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          time: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
  },
};
// # Sensor
