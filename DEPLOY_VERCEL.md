# Deploying Clearly to Vercel

## Prerequisites
- A Vercel account (https://vercel.com)
- Your Google Gemini API Key

## Steps

1. **Login to Vercel CLI** (if not already logged in):
   ```bash
   npx vercel login
   ```

2. **Deploy**:
   Run the following command in your terminal:
   ```bash
   npx vercel
   ```
   - Set up and deploy? **Y**
   - Which scope? **(Select your account)**
   - Link to existing project? **N**
   - Project name? **clearly** (or your preferred name)
   - In which directory? **./**
   - Want to modify these settings? **N**

3. **Set Environment Variables**:
   Once the project is linked, go to your Vercel Project Dashboard > Settings > Environment Variables.
   Add:
   - **Key**: `GOOGLE_API_KEY`
   - **Value**: `Your_Gemini_API_Key_Here`

   *Note: Without this key, the Vercel deployment will fail to use the AI features and fall back to mock data.*

4. **Redeploy (to apply env vars)**:
   ```bash
   npx vercel --prod
   ```
