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
                    echo 'Testing..'
                    try {
                        
                        sh 'D:/Jeykel/UCR/CuartoYear/Segundo semestre/Analisis de Sistemas/Tarea/Proyecto Analisis Codigo/Analisis_Proyect_Front/login.spec.js'
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