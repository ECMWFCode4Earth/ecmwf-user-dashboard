# ECMWF User Dashboard

# Start a local dev environment
In the repository root run:
```
docker-compose build && docker-compose up
```
This will build the images for the web frontend and the node.js backend, as well as a MongoDB database to store user data. You then can access the user dashboard at http://localhost:3000/ .

# Generate kubernetes deployment
To generate all configuration files needed for a kubernetes deployment you'll need ``kustomize`` installed on your system.

## Configure secrets
Before you begin, please make sure that you configure the secrets in the [.env.secrets](./ecmwf-user-dashboard/base/.env.secrets) file. The file content should look something like this:
```
SECRET_KEY=<your backend secret key>
MONGODB_USER=<mongo db admin user>
MONGODB_PASS=<mongo db admin password>
# kubernetes cluster internal mongodb url
DB_URI=mongodb://<mongo db admin user>:<mongo db admin password>@prod-mongodb:27017

EVENTS_=<api events>
EVENTS_AK=<api access key>
```
Make sure that ``DB_URI`` points to the (internal) kubernetes service name for MongoDB. By default the service name is ``prod-mongodb`` for production deployment and ``dev-mongodb`` for development.

## Generate k8s configuration
Using ``kustomize`` run:
```
# build dev deployment
kustomize build ecmwf-user-dashboard/overlays/development
# build prod deployment
kustomize build ecmwf-user-dashboard/overlays/production
```
This will output kubernetes configuration to stdout.

## Patch URLs and deploy
By default, all URLs point to ``example.com`` as TLD:
- the frontend at http://user-dashboard.example.com
- the api at http://dashboard-api.example.com

Thus, before applying the configuration you should patch all URLs to point to the correct DNS name used in deployment.

For example if you want your services to be configured for ``dev.example.com`` a simple way to do it is using the ``sed`` utility:
```
kustomize build ecmwf-user-dashboard/overlays/development | sed 's/example.com/dev.example.com/g' | kubectl apply -f -
```
The frontend application would then be available at http://user-dashboard.dev.example.com.

If you don't have a dns name available, just a public ip that points to your ingress, you can use https://nip.io to access your services. For example if the  ip address for your services is ``172.16.17.18``, you could use ``dev.172.16.17.18.nip.io`` as a valid dns suffix for your services:
```
kustomize build ecmwf-user-dashboard/overlays/development | sed 's/example.com/dev.172.16.17.18.nip.io/g' | kubectl apply -f -
```