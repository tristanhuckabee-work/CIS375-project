"""create project_users table

Revision ID: 8a08c81febee
Revises: 0f6217d4437e
Create Date: 2024-10-02 16:42:22.545330

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


revision = '8a08c81febee'
down_revision = '0f6217d4437e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('project_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), server_default='member', nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('project_users')