from flask import Blueprint, jsonify, request
from ..models.models import Trajectory

trajectory_routes = Blueprint('trajectories', __name__)

DEFAULT_PAGE = 1
DEFAULT_PER_PAGE = 10

# Route to list all taxis
@trajectory_routes.route('/trajectories', methods=['GET'])
def get_trajectories():
    """
    Gets the list of all trajectories.
    ---
    parameters:
      - name: page
        in: query
        type: integer
        required: false
        description: Page number for pagination.
      - name: per_page
        in: query
        type: integer
        required: false
        description: Number of items per page.
    responses:
      200:
        description: A list of taxis.
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the trajectory.
              taxi_id:
                type: string
                description: The ID of the associate taxi.
              date:
                type: string
                format: date-time
                description: The date and time of the trajectory
              latitude:
                type: float
                description: The latitude of the trajectory
              longitude:
                type: float
                description: The longitude of the trajectory
                
    """
    # Pagination parameters
    page = int(request.args.get('page', DEFAULT_PAGE))
    per_page = int(request.args.get('per_page', DEFAULT_PER_PAGE))

    # Calculate start and end index for pagination
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    # Query taxis from the database
    trajectories = Trajectory.query.all()

    # Get the subset of taxis for the current page
    trajectories_subset = trajectories[start_index:end_index]

    # Convert taxis to JSON format
    trajectories_list = [
      {
        'id': traj.id,
            'taxi_id': traj.taxi_id,
            'date': traj.date.isoformat(),  # Assuming date is a datetime object
            'latitude': traj.latitude,
            'longitude': traj.longitude
      }
      for traj in trajectories_subset
    ]

    return jsonify(trajectories_list)
