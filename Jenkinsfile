pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git 'https://github.com/Dasxunyasha/devops'

                sh 'chmod +x ./gradlew'
                sh './gradlew clean build -x test'
            }

            post {
                success {
                    junit 'build/test-results/test/TEST-*.xml'
                    archiveArtifacts artifacts: 'build/libs/*.jar', fingerprint: true
                }
            }
        }
    }
}
