﻿namespace Mazda.Dtos.User
{
    public class ChangePassworkDto
    {
        public string? Username { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
