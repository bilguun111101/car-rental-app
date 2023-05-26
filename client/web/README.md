# 1 - Install next js with tailwind css

npx create-next-app -e with-tailwindcss my-project

# 2 - Install heroicons

npm i @heroicons/react

# 3 - next.config.js dr img-nii tohirgoo

images: {
domains: ['links.papareact.com'],
},

# 4 - npm i tailwind-scrollbar-hide

tailwind.config.js dr "plugins: [require('tailwind-scrollbar-hide')]"

=====================================================

1. git remote add origin https://github.com/Ganzorig2022/next-js-12-airbnb-clone.git

2. git push --set-upstream origin main

# 5- Deploy to Vercel

new project --> import github repo --> DEPLOY

https://next-js-12-airbnb-clone.vercel.app/

# 6 - Calendar Date package

npm install react-date-range
npm install --save react date-fn
https://www.npmjs.com/package/react-date-range

# 7 - Custom class add into tailwind css

/styles/global.css dotor

@layer components {
.button {
@apply px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out;
}
}

# 8 - loading progress package

npm i @badrap/bar-of-progress

/pages/\_app.js file dotor tohirgoo hiine.

# 9 - Map Box

https://account.mapbox.com/ - SIGN UP

1. Create a map in Studio
2. New styles
3. Choose "navigation" template
4. Customization Navigation dr darna.

5. https://github.com/visgl/react-map-gl-aas npm suulgana.
   npm install --save react-map-gl mapbox-gl
6. /components/Map.js dotor

# 10 - Deply with env on vercel

npm i -g vercel

$ vercel env add MAPBOX_KEY

https://stackoverflow.com/questions/65003531/application-installed-by-npm-eg-file-c-users-name-appdata-roaming-npm-ng-ps1
