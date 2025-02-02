const getPrismaInstance = require("../utils/PrismaClient");
const {generateToken04} = require("../utils/TokenGenerator")

exports.checkUser = async (req, res, next) => {
    try {
        const {email} = req.body
        if (!email){
            return res.json({msg:"Email is required.", status:false})
        }
        const prisma = getPrismaInstance()
        const user = await prisma.user.findUnique({where:{email}})
        if (!user) {
            return res.json({ msg: "User not found", status: false });
        } else {
            return res.json({ msg: "User found", status: true, data: user });
        }
    }catch(err){
        console.log(err)
    }
}

exports.onBoardUser = async (req, res, next) => {
    try {
        const { email, name, about, image: profilePicture } = req.body;
        if (!email || !name || !profilePicture) {
            return res.send("Email, Name, and Image are required.");
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.create({
            data: { email, name, about, profilePicture },
        });
        console.log(user)
        return res.json({ msg: "Success", status: true, user });
    } catch (err) {
        console.error("Error during user creation")
        next(err)
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const prisma=getPrismaInstance()
        const users = await prisma.user.findMany({
            orderBy:{name: "asc"},
            select:{
                id:true,
                email:true,
                name:true,
                profilePicture:true,
                about:true,
            },
        });
        const usersGroupedByInitialLetter = {}
        users.forEach((user) => {
            const initialLetter = user.name.charAt(0).toUpperCase()
            if (!usersGroupedByInitialLetter[initialLetter]) {
                usersGroupedByInitialLetter[initialLetter] = []
            }
            usersGroupedByInitialLetter[initialLetter].push(user)
        })
        return res.status(200).send({users:usersGroupedByInitialLetter})
    } catch (err) {
        next(err)
    }
}

exports.generateToken = async (req, res, next) => {
    try {
        const appId = parseInt(process.env.ZEGO_APP_ID)
        const serverSecret = process.env.ZEGO_SERVER_SECRET
        const userId = req.params.userId

        if (appId && serverSecret && userId) {
            const effectiveTime = 3600
            const payload = ""
            const token = generateToken04(appId, userId, serverSecret, effectiveTime, payload)
            
            // Send the response with the token
            return res.status(200).json({ token });
        } else {
            // If any of the required parameters is missing, send an error response
            return res.status(400).send("User id, app id, and server secret are required");
        }
    } catch (error) {
        // Handle any other errors
        next(error);
    }
}

