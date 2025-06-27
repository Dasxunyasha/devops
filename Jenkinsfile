pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('backend') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean build'
                }
            }

            post {
                success {
                    junit 'backend/build/test-results/test/TEST-*.xml'
                    archiveArtifacts artifacts: 'backend/build/libs/*.jar', fingerprint: true
                }
            }
        }
    }
}
