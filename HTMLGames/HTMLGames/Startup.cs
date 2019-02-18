using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HTMLGames.Startup))]
namespace HTMLGames
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
