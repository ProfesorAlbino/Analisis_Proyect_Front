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
                echo 'Testing....'
                bat 'npm test'
            }
         }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                bat 'npm start'
                //sg
            }
        }
    }
}