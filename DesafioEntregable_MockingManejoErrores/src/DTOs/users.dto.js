export default function buildUserDTO(user) {
    // Construye el DTO con la información necesaria
    const userDTO = {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
    };

    return userDTO;
}