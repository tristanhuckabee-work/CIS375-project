"""create notes migration

Revision ID: 2fc8fb1cf14e
Revises: a46dec85a240
Create Date: 2024-12-07 20:00:07.196699

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '2fc8fb1cf14e'
down_revision = 'a46dec85a240'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ticket_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('ticket_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=1000), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['ticket_id'], ['tickets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ticket_notes')
    # ### end Alembic commands ###