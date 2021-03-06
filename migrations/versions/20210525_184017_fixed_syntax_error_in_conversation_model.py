"""Fixed syntax error in conversation model

Revision ID: 567096d8589e
Revises: 182858d130d4
Create Date: 2021-05-25 18:40:17.985123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '567096d8589e'
down_revision = '182858d130d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('conversations', sa.Column('user_1_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'conversations', 'users', ['user_1_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'conversations', type_='foreignkey')
    op.drop_column('conversations', 'user_1_id')
    # ### end Alembic commands ###
