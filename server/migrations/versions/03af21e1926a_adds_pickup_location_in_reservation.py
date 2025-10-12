"""adds pickup location in reservation

Revision ID: 03af21e1926a
Revises: 
Create Date: 2025-10-12 10:51:14.543346
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '03af21e1926a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Add new columns with temporary server defaults
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('amount_paid', sa.Float(), nullable=False, server_default='0'))
        batch_op.add_column(sa.Column('pickup_location', sa.String(
            length=200), nullable=False, server_default='Unknown'))
        batch_op.drop_column('total_price')

    # Remove the server defaults (optional, keeps DB cleaner)
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.alter_column('amount_paid', server_default=None)
        batch_op.alter_column('pickup_location', server_default=None)


def downgrade():
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('total_price', sa.Float(), nullable=False))
        batch_op.drop_column('pickup_location')
        batch_op.drop_column('amount_paid')
