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
                dir('D:/Jeykel/UCR/CuartoYear/Segundo semestre/Analisis de Sistemas/Tarea/Proyecto Analisis Codigo/Analisis_Proyect_Front') {
                    sh 'npm test'
                }
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