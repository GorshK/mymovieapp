# My MovieApp

My MovieApp is a Netflix-inspired web application built with React and React Router. It allows users to browse popular and top-rated movies, search for movies, view detailed movie information, and manage a personal watchlist using the TMDB (The Movie Database) API. The app is containerized with Docker and deployed to Amazon Elastic Kubernetes Service (EKS) for scalability and reliability.

## Features
- **Browse Movies**: View popular and top-rated movies fetched from the TMDB API.
- **Search Movies**: Search for movies by title with real-time results.
- **Watchlist**: Add or remove movies to a personal watchlist (stored client-side).
- **Movie Details**: View detailed information about a selected movie.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Containerized**: Built as a Docker image and deployed to Amazon EKS with Kubernetes.

## Prerequisites
To run or deploy this project, ensure you have:
- Node.js and npm: Version 16.x or higher (install from [nodejs.org](https://nodejs.org))
- Docker: Docker Desktop (install from [docker.com](https://www.docker.com/products/docker-desktop))
- AWS Account: For EKS deployment (sign up at [aws.amazon.com](https://aws.amazon.com))
- AWS CLI: Configured with credentials (install from [aws.amazon.com/cli/](https://aws.amazon.com/cli/))
- kubectl: For Kubernetes interactions (install from [kubernetes.io](https://kubernetes.io/docs/tasks/tools/))
- eksctl: For EKS cluster management (install from [eksctl.io](https://eksctl.io/))
- TMDB API Key: Obtain from [themoviedb.org](https://www.themoviedb.org/settings/api)

## Project Structure
```plaintext
my-movieapp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── Browse.js
│   │   ├── Search.js
│   │   ├── Watchlist.js
│   │   ├── MovieDetails.js
│   │   └── MovieCard.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Home.css
│   │   ├── Browse.css
│   │   ├── Search.css
│   │   ├── Watchlist.css
│   │   └── MovieDetails.css
│   └── App.js
├── nginx/
│   └── nginx.conf
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md

Setup Instructions
Local Development
Clone the Repository:

bash
git clone <repository-url>
cd my-movieapp
Install Dependencies:

bash
npm install
Run the App Locally:

bash
npm start
Open http://localhost:3000 in your browser. Navigate to Home, Browse, Search, and Watchlist pages.

Docker Setup
Build the Docker Image:

bash
docker build -t my-movieapp:latest .
Run the Container Locally:

bash
docker run -p 3000:80 my-movieapp:latest
Access the app at http://localhost:3000. Verify all features (Browse, Search, Watchlist).

Troubleshooting:

bash
docker logs <container-id>
Amazon EKS Deployment
Push Docker Image to Amazon ECR:

bash
aws ecr create-repository --repository-name my-movieapp --region <region>
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
docker tag my-movieapp:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/my-movieapp:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/my-movieapp:latest
Create an EKS Cluster:

bash
eksctl create cluster --name my-movieapp-cluster --region <region> --nodegroup-name my-nodes --node-type t3.medium --nodes 2 --managed
Takes ~15-20 minutes. Then configure kubectl:

bash
aws eks update-kubeconfig --name my-movieapp-cluster --region <region>
Deploy to EKS:

Update k8s/deployment.yaml with your ECR image URI:

yaml
image: <aws_account_id>.dkr.ecr.<region>.amazonaws.com/my-movieapp:latest
Apply manifests:

bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
Get the LoadBalancer URL:

bash
kubectl get svc
Access the app at http://<EXTERNAL-IP>.

Verify Deployment:

bash
kubectl get pods
kubectl logs -l app=my-movieapp
Clean Up:

bash
eksctl delete cluster --name my-movieapp-cluster --region <region>
aws ecr delete-repository --repository-name my-movieapp --region <region> --force
Usage
Home: View trending movies.

Browse: Explore popular and top-rated movies.

Search: Search for movies by title.

Watchlist: Add or remove movies to your watchlist (stored in browser memory).

Movie Details: Click a movie to view its details (e.g., overview, release date).

Development Notes
Tech Stack:

React 18.2.0

React Router DOM 6.16.0

Axios 1.6.2 for API calls

Nginx (Docker) for serving the production build

Kubernetes for EKS deployment

Styling: Uses CSS with a Netflix-like dark theme (#141414 background, #e50914 red accents).
API: TMDB API for movie data (requires a valid API key).
Favicon: Included in public/favicon.ico.

Troubleshooting
Docker Run Fails:

Verify nginx.conf is correct

Check logs:

bash
docker logs <container-id>
EKS Deployment Fails:

Ensure the ECR image URI is correct

Check pod logs:

bash
kubectl logs -l app=my-movieapp
Verify security groups allow port 80

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m "Add your feature")

Push to the branch (git push origin feature/your-feature)

Open a pull request

License
This project is unlicensed. Use it at your own discretion.