export type LoginFormData = {
    id: number | ""; 
    password: string;
};

export type LoginResponse = {
    success: boolean;
    message: string;
}