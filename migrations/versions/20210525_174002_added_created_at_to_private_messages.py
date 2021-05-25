"""added created_at to private messages

Revision ID: 40f8e060501b
Revises: 0e35e4011747
Create Date: 2021-05-25 17:40:02.276603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40f8e060501b'
down_revision = '0e35e4011747'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('private_messages', sa.Column('created_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('private_messages', 'created_at')
    # ### end Alembic commands ###
