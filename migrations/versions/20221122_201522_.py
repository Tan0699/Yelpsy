"""empty message

Revision ID: db16bd3dc2b4
Revises: 50137741780e
Create Date: 2022-11-22 20:15:22.913788

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db16bd3dc2b4'
down_revision = '50137741780e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('firstName', sa.String(length=40), nullable=False))
    op.create_unique_constraint(None, 'users', ['firstName'])
    op.drop_column('users', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('username', sa.VARCHAR(length=40), nullable=False))
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'firstName')
    # ### end Alembic commands ###