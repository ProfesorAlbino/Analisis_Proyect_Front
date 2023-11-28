pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }

         stage('Test') {
    steps {
        script {
            echo 'Running Selenium Tests..'
            try {
                dir('../'){
                sh 'npm run test'  // Reemplaza con el nombre real de tu archivo de prueba
                }
            } catch (Exception e) {
                currentBuild.result = 'FAILURE'
                error("Error en la etapa de prueba: ${e.message}")
            }
        }
    }
         }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}