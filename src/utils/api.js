import axiosWithConfig from "./axiosWithConfig";

export const getAttendance = async () => {
    try {
        const response = await axiosWithConfig.get("/attendance");

        return response.data
    } catch (error) {
        throw Error("Failed to get Attendance", error)
    }
}

export const createAttendance = async (data) =>  {
    try {
        const response = await axiosWithConfig.post("/attendance", data)

        return response.data
    } catch (error) {
        throw Error ("Failed to Send Attendance", error)
    }
}