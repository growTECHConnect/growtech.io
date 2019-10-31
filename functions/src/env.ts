interface Env {
    [index: string]: {
        serviceAccount: any;
    };
}

const env: Env = {
    'growtech-staging': {
        serviceAccount: {
            type: 'service_account',
            project_id: 'growtech-staging',
            private_key_id: 'e37eefd45c4659c2211288e89bd880f2ad272013',
            private_key:
                '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSqq3YIWzs4m8m\n6oSwvzjSP0QfSrUcfeoyYXHfg3mPYuyLBV6oHGfPeiCl0NGw9S+L+dvrE5Pcw6AW\nuEcyeC94iiShLbCFetAAUAHfQHDMI3LlHI5lXX7m+pMXV6Qktk4yYkA76++yqrFD\nhblFHmfeXhYnfPqJV3VCgIffnvH2g6MpmWzqdlv/tXzhWLa3MclOxaDpQufyBCoA\no/cCleYeRZfdG3z8mcA3Fjz8SEam0QztCpw2RJCG3loWeFiDf+5Eh9ekk1n86wYA\n5nzoeObOwo5tAfJgn7igmECNWua9QBMnm+2gs0H6xkBWy+/6VNvalu4g165MslSI\nD+JmW3qpAgMBAAECggEAP9orxw6ajVI0jn8WqNvMxS0X4MQsEO65RXvzn+OhvKwn\nNhvyjNHPRTunGZspc5FdT/fziFTuxEMnCrvgGJQFD2wPnirTDiIjWXTmnFxT1AwK\njxcQsfictjXMz45o2hfHq83L2l2w0V6bS/QEK8cDhIrP/DgNWAOCLx32EPmELUs7\nvzOq7+3FiN+XpFkJ/3gJytrPlJ2pd9yrHzdx5caM+/hj5Yz7cHA+9vPzw47t8lwb\nxEWD53MF28k41XiST7sPFKuazc9OVi/YL7ljrDZhpEcFMuM2TNmVTi9aJ4oh3ABo\n3Ef9CoKpKxTNFEsYL4fzXSXY5AFdSbu24AbFfSXd4QKBgQD6zyIx26h9MUWI+UZ3\n5jd00zvtphvsfTMN4zpZSUMXy315++0vxD4Rmwzv+Cw3KyKikXJNy6dGz9M6Eage\nXn2NGWVNdxfFUIDZ0SmI+Os6EtvcdkIjHIFfnzr4ZzQ0FhB/sbjOu8MbUlXOomWj\nwKAj1eaarb2yIDVssB68mVdVFwKBgQDXBtu6CDJS0AVW75bAaGg4MhISVDMR3HUa\n7kMlIafuj7+PoGwL4yYuJ+grnhug8TCoAeFnGMQWsgDbyGDHFHGkFafAzZJQClz/\nIwlOl69QN9Hz7Il1xgcE4LlzKA4J5pBTRWsyc4feT2LVLuGm66gaagWDQ7/BQ10K\nIML9inkGPwKBgEqz5ztycXzYcB2cIaEUsO/a+r6N+0M1Bz/brkVpzNIJihYLM1pG\n2TXlOLVA9ep4rpg9Og5x2iD9RazGFYz2F+8u4T1xe2MJ11cJNZXWjjl95H6Fuq06\nkE4q3yWdl67r434lMSZiRnqcy3IAbMWZWhlSXJ01ooqrjT4SNxV1ls2BAoGAbvJr\n9z35cT9CMgwnNZnphG1ZY7msLCAbEE01uff2pSHojlwQw8VtUs1mfvLygIVSPK3T\ntpVRwAASb1Shkrbat/Ywe0vWnZPrTf2u9K1RWMukef5nIqyNvJeTOHbHX5Zmi4C7\nAeoYhb1iWmr5JV5ce1yPAZ64VyjB3dLvqVCEh5MCgYEAgq/AoYfX45xsCgoJ0GMw\nP1OmxNkROWtfXjrIbRqqG0IBFzLsgBGWjTwnVCpSruLb9G67roWmVa+Uo1ZetFyU\ndTK/H55cbO6h4A+78EEzGWZSsTh9FlXW7ykQU4la3aqL/utITuvRiqJmsJcfMpl3\nbxqDw19p3urzqwVFoKsx7xM=\n-----END PRIVATE KEY-----\n',
            client_email: 'firebase-adminsdk-htb63@growtech-staging.iam.gserviceaccount.com',
            client_id: '102624484379711498912',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url:
                'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-htb63%40growtech-staging.iam.gserviceaccount.com',
        },
    },
    'growtech-production': {
        serviceAccount: {
            type: 'service_account',
            project_id: 'growtech-production',
            private_key_id: '6a0966277e543f2a548575a4ad7d2dc2732a8b4d',
            private_key:
                '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUyzrFMnxG1kfi\nSIkCJ9AuKK/jRMBpu00GkQtimdQx2ddgVP0YWtteA6fRMrdXHhSBRTRr5SVCK2Q3\n2mTLPpWXlKJolk18eNLRRBYpwjevmmGKGGri0a8DouCaro54xpE+qgCIjHotabK5\nEbcWYWrc+oU2liitCnzWDx4kwiSqB856N/w08qK8kMdtKsIWkZljr6GKSiud+qRb\n1VkCBcgvlg3CfIcccTm9wuKZplKZ//9W6axl65R1cWfjjdswC9JXWG/ZvHxxukiz\nZQpW+Y8SafcH+BqiMwQmXyZwmPANDW4/PvxiXfZP/Yt1iD4w5aFpvaszmi3jlth+\n6Lai/qjhAgMBAAECggEAKwXGVP1/hKXxvAKYJvjnD2mxTcfz0L6ZC3SF87kh61Yf\nGdoJInEm67yn2evNqlFmwWgGu8nSZ5sPS70IluHeNCmEejQ3bG2tG1gSBnoDSvGb\nEWh1A2d4sNb4FZGyXUag+ZsDM3hW3WmqBSwTodOCKCoBuaJaWYpmRSiy4RMHsefF\nxyrTZJRlXMTfgik4jB6qzoqaj2q9fqzeST/9xyKFtZ5TZuV5p/DN0a4iVU4YWJDW\n/e40yyOnVW86PGfklHJVcxRjV4XTrJtHug7Vq06dQlep0+4FoAzkmM90mr5mvATI\nDzAyppOocZb8RPViohBqGPpsx/8MtbcUog7N7B01rwKBgQDSB2tpQM7LKdMRG9MB\n81ngTu2AX891eyQbXdy0m9GWO1heqQ0A2ucRyBbZtJdc4Hs0U6MKlNm0j34XvMFo\nNVLYgwKjMfrFLBmrBVUM/usLaAWqKpkiFefq4DQ5WbhTLZSJNXL/eNCoDiZS6bcV\nSK+PM5S2TIs1Q8ad7/xpSukcKwKBgQC1XJ1udy3cN+EOaBVEW6vdrP4LEF/vyFwA\n73VNMyrXgx/qUokcY6UqPjSkv705jCMy7oJNChFH0dBGDt8UPSFP1uQCW2zcCFCS\n6IEOGcfIsYTnQgGGON1YRfiY6I2Moq+FCGNrS6QVJF0dyM+NCLporl/xpdfc3zrx\nbBie4CTtIwKBgEPm6i8JKNI+H2L0n++NgY0nd1l9oFDXEwFWAzjQ952eah+QgAe6\nveHd0qVn4VfBq5NrRtbw8MGTcqyx9cV/F92v3XZtfimo7FOCUdD1yX/SjaJKS1/d\nvTEOc1PnUdRydAc4JIm7wZnTmUhND0fuS/P8NSQK8yaxVtFQ+UYBVgQpAoGAfxHb\nBDDgovFL8GogrHqGWpUAkgPxE/IP9F/SkjqNg95NmEIn6wouCQD4pY3qKM31Q5Q1\nG4E4RlfNU6jLyERkeKoZq0UfarMwsR3Sfmy1u/oVImru4nopK9YqrggSVT0POWh9\nMAoZdu65h0rRkQFSilHSy17ldc26YLjaL0bg2H0CgYEAmRE2Mt+SgIRXciGLl9O7\nwPOWdrDLPZt98ZA4BpZ3dlVcqFlxehnpJ5fC7QKhLBY7OfSUXofh1u+qEam3bk1K\nOK9QbsUDQnNZKIl0eEgxkhU+ROQwMsLn8ivWY1JlH6ypdaYmOyNB3LUGJz6beGVx\nCP7pTpCLCCsGwmhMqFnLE6E=\n-----END PRIVATE KEY-----\n',
            client_email: 'firebase-adminsdk-btpz3@growtech-production.iam.gserviceaccount.com',
            client_id: '117844670631605954408',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url:
                'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-btpz3%40growtech-production.iam.gserviceaccount.com',
        },
    },
};

export default env;
