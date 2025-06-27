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

        stage('Publish Jacoco Report') {
            steps {
                jacoco(
                    execPattern: 'backend/build/jacoco/test.exec',
                    classPattern: 'backend/build/classes/java/main',
                    sourcePattern: 'backend/src/main/java'
                )
            }
        }

        stage('Archive Jacoco HTML Report') {
            steps {
                archiveArtifacts artifacts: 'backend/build/reports/jacoco/test/html/**', fingerprint: true
            }
        }
    }
}
