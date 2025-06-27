pipeline {
    agent any

    stages {
        stage('Build & Test') {
            steps {
                dir('backend') {
                    sh './gradlew clean build jacocoTestReport'
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                junit 'backend/build/test-results/test/TEST-*.xml'
            }
        }

        stage('Archive Jacoco Report') {
            steps {
                archiveArtifacts artifacts: 'backend/build/reports/jacoco/test/html/**', fingerprint: true
            }
        }
    }
}
