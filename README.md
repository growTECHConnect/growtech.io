# growtech.io


## Getting Started

Commands to Run Prior to Starting the Application

1.  Clone project

    Sometimes github seems to not agree with ssh keys for this repository.

    ```
    git clone https://github.com/growTECHConnect/growtech.io.git
    ```

2.  Install Dependencies
    ```
    cd growtech.io && npm install
    ```

3.  Authenticate with Firebase

    This step will require another user to give you permissions to the growTECH firebase console.
    Then:
    ```
    firebase login
    ````
    _if behind a proxy you can use the `firebase login --no-localhost` flag._

4.  Use `npm run` to [list available scripts](package.json#L6-L16)


## Using Firebase:

#### Hosted on Firebase at the following app urls:

- https://growtech-staging.firebaseapp.com/
- https://growtech-production.firebaseapp.com/

[Firebase CLI](https://firebase.google.com/docs/cli/)

## Notes

The Firebase functions utilize Typescript. Run `npm run watch:functions` to compile the `functions` directory.
