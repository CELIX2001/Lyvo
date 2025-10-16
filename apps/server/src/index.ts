import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import jwt from '@fastify/jwt';

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(cors, {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501']
});

fastify.register(jwt, {
  secret: 'your-secret-key'
});

fastify.register(websocket);

// Health check route
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// WebSocket connection
fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Echo back the message
        connection.socket.send(JSON.stringify({
          type: 'echo',
          data: data,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
    
    connection.socket.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();