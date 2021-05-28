from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .channel_messages import seed_channel_messages, undo_channel_messages
from .memberships import seed_memberships, undo_memberships
from .conversation import seed_conversations, undo_conversations
from .private_messages import seed_private_messages, undo_private_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_channel_messages()
    seed_memberships()
    seed_conversations()
    seed_private_messages()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_channels()
    undo_channel_messages()
    undo_memberships()
    undo_conversations()
    undo_private_messages()
    # Add other undo functions here
