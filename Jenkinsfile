pipeline {
    agent any
    stages {
        stage('Install Node.js and npm') {
    steps {
        script {
            // Instalar Node.js y npm
            def nodejsInstallation = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            def nodeHome = "${tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}"
            env.PATH = "${nodeHome}/bin:${env.PATH}"
            sh 'npm install'
        }
    }
}

        stage('Build') {
            steps {
                echo 'Building..'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing....'
                sh 'npm test'
            }
         }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'npm start'
            }
        }
    }
}