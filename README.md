# Reactivities

Docker build:
docker build -t mancha24/reactivities . 

Docker run:
docker run --rm -it -p 8080:80 mancha24/reactivities

Docker push:
docker push mancha24/reactivities:lastest

Remove database:
dotnet ef database drop -p Persistence -s API 

News migrations 
dotnet ef migrations add PostgresInitial -p Persistence -s API

DOTNET Watch
dotnet watch --no-hot-reload


React packages install:
npm install react-infinite-scroller
npm install react-cropper
npm install react-dropzone 
npm ls date-fns 
npm install date-fns@2.29.3
npm install react-datepicker
npm install @types/react-datepicker --save-dev
npm install yup
npm install @types/yup --save-dev
npm install formik
npm install react-toastify
npm install react-calendar
npm install @types/react-calendar
