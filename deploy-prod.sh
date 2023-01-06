# 1.Build reactjs app with production mode
npm run build

# 2.Move to build folder
cd build

# 3.Clone file index.html into 200.html
cp index.html 200.html

#4 Deploy
surge . shoes-shop-app.surge.sh
