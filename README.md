# Closecreate

> A matchmaking platform for content creators

# Quick Start 🚀

### Add S3 and MongoDB credentials to the .env-example file and rename to .env

```
S3_KEY=
S3_SECRET=
S3_BUCKET=
S3_REGION=
MONGO_URI=
JWT_SECRET=
```

### Add S3 Bucket info to s3_config for frontend access (Make bucket contents public)

```
module.exports = {
  S3_REGION: '',
  S3_BUCKET: ''
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.  
And run...

```bash
NODE_ENV=production node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## App Info

### Author

[Harry Herskowitz](http://www.harryherskowitz.com)

### Version

1.0.0

### License

This project is licensed under the MIT License
