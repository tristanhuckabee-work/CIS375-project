from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class ProjectForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])