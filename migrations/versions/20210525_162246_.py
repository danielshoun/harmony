"""empty message

Revision ID: 0e35e4011747
Revises: 02b6270cbebe
Create Date: 2021-05-25 16:22:46.144587

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0e35e4011747'
down_revision = '02b6270cbebe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('channel_messages', sa.Column('created_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('channel_messages', 'created_at')
    # ### end Alembic commands ###