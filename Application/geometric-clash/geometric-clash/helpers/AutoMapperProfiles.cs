using AutoMapper;
using geometric_clash.DTOs;
using geometric_clash.Entities;

namespace geometric_clash.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, MemberDto>();
        }
    }
}