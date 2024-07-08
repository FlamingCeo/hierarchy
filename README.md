
## Project Setup

### Installation
Node version - v18.18.0
To install dependencies, run:

```bash
npm install
```

### Database Setup

#### Prerequisite - MySQL

For migration and seeding, use:

```bash
npm run sequelize:init
```

This command will migrate the database schema and seed initial data.

### Environment Variables

Create a `.env` file based on `.env.example` in the root of your project. Configure necessary environment variables. All details are at `.env.example`.

## Usage

To start the server, use:

```bash
npm start
```

## API Endpoints

<details>
  <summary>POST /api/auth/login</summary>
  <p>Endpoint to authenticate and obtain JWT token.</p>
  <h4>Request</h4>
  <pre>
  <code>
  {
    "email": "test@example.com",
    "password": "123456"
  }
  </code>
  </pre>
  <h4>Response</h4>
  <pre>
  <code>
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjA0NjMwNDEsImV4cCI6MTcyMDU0OTQ0MX0.Cm5KVVSkNzf9T4BR3myde5t09x20iZKYgYX2zATuvhA"
  }
  </code>
  </pre>
  <p>Use the <code>accessToken</code> in the Authorization header for subsequent requests:</p>
  <pre>
  <code>
  Authorization: Bearer &lt;accessToken&gt;
  </code>
  </pre>
</details>

<details>
  <summary>GET /api/hierarchy/1</summary>
  <p>Example endpoint to retrieve hierarchy data for ID 1.</p>
  <h4>Response</h4>
  <pre>
  <code>
  {
    "id": 1,
    "name": "CTO 1",
    "positionId": 1,
    "positionName": "CTO",
    "children": [
      {
        "id": 1008,
        "name": "Senior Software Engineer 8",
        "positionId": 2,
        "positionName": "Senior Software Engineer",
        "children": [
          {
            "id": 2170,
            "name": "Software Engineer 170",
            "positionId": 3,
            "positionName": "Software Engineer",
            "children": []
          },
          {
            "id": 2058,
            "name": "Software Engineer 58",
            "positionId": 3,
            "positionName": "Software Engineer",
            "children": [
              {
                "id": 3173,
                "name": "Junior Software Engineer 173",
                "positionId": 4,
                "positionName": "Junior Software Engineer"
              }
            ]
          }
        ]
      },
      {
        "id": 1011,
        "name": "Senior Software Engineer 11",
        "positionId": 2,
        "positionName": "Senior Software Engineer",
        "children": [
          {
            "id": 2945,
            "name": "Software Engineer 945",
            "positionId": 3,
            "positionName": "Software Engineer",
            "children": [
              {
                "id": 3170,
                "name": "Junior Software Engineer 170",
                "positionId": 4,
                "positionName": "Junior Software Engineer"
              }
            ]
          }
        ]
      }
    ]
  }
  </code>
  </pre>
</details>

### Authentication

For authenticated endpoints, include a JWT token in the Authorization header as shown in the `POST /api/auth/login` response example.

## Testing

To run tests, use:

```bash
npm test
```

---



## Deploying Node.js on EC2 Instance with AWS Services

### Deploying Node.js Application on EC2

1. **EC2 Instance Setup:**
   - Launch an EC2 instance with your chosen Amazon Machine Image (AMI), like Amazon Linux.
   - Configure security groups to allow SSH (port 22) and optionally HTTP/HTTPS traffic (ports 80/443).

2. **Node.js Application Deployment:**
   - Clone your Node.js application repository from Git onto the EC2 instance.
   - Install Node.js and npm if needed.
   - Install application dependencies using `npm install`.
   - Configure environment variables in a `.env` file.
   - Start the Node.js application with `npm start` or use PM2 for managing processes.

### Creating an Amazon Machine Image (AMI) for Backup

1. **AMI Creation:**
   - Once the Node.js application is set up and tested on the EC2 instance, create an **AMI**(Amazon Machine Image).
   - This captures the instance's state, including OS, software, configurations, and your Node.js app.
   - Use AWS Management Console or CLI to create the AMI from the running instance.

### Using RDS Database

1. **Setting Up RDS Database:**
   - Create an RDS database instance via AWS Management Console.
   - Configure instance settings (size, storage) and security groups.
   - Obtain database connection details (endpoint, port, credentials).
   - Update your app's database configuration to connect to RDS.

### High user traffic manangement
*I would use load balancer concept   to manage user traffic. In this case, AWS auto scaling and load balancer services*
1. **Auto Scaling and Load Balancing:**
   - Create an Auto Scaling Group using the **AMI** for automatic instance scaling.
   - Define scaling policies based on metrics like CPU usage.
   - Use an Application Load Balancer to distribute traffic across EC2 instances.
   - Configure ALB health checks to ensure instances handle traffic effectively.