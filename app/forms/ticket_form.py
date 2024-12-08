from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

def priority_exists(form, field):
  priority = field.data
  if not type(priority) is int:
    raise ValidationError('Priority must be a number.')

class TicketForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  project_id = IntegerField('project_id', validators=[DataRequired()])
  status = IntegerField('status', validators=[DataRequired()])
  priority = IntegerField('priority', validators=[priority_exists])