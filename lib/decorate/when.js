"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.when = when;
function when(condition, decorator) {
  if (condition) return decorator;

  /* Null decorator. */
  return (object, key, descriptor) => {
    if (descriptor) return descriptor;
    if (object) return object;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0ZS93aGVuLmpzIl0sIm5hbWVzIjpbIndoZW4iLCJjb25kaXRpb24iLCJkZWNvcmF0b3IiLCJvYmplY3QiLCJrZXkiLCJkZXNjcmlwdG9yIl0sIm1hcHBpbmdzIjoiOzs7OztRQUNnQkEsSSxHQUFBQSxJO0FBQVQsU0FBU0EsSUFBVCxDQUFjQyxTQUFkLEVBQWtDQyxTQUFsQyxFQUFtRTtBQUN4RSxNQUFJRCxTQUFKLEVBQWUsT0FBT0MsU0FBUDs7QUFFZjtBQUNBLFNBQU8sQ0FBQ0MsTUFBRCxFQUFpQkMsR0FBakIsRUFBK0JDLFVBQS9CLEtBQTJEO0FBQ2hFLFFBQUlBLFVBQUosRUFBZ0IsT0FBT0EsVUFBUDtBQUNoQixRQUFJRixNQUFKLEVBQVksT0FBT0EsTUFBUDtBQUNiLEdBSEQ7QUFJRCIsImZpbGUiOiJ3aGVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGVuKGNvbmRpdGlvbjogYm9vbGVhbiwgZGVjb3JhdG9yOiBEZWNvcmF0b3IpOiBEZWNvcmF0b3Ige1xuICBpZiAoY29uZGl0aW9uKSByZXR1cm4gZGVjb3JhdG9yXG5cbiAgLyogTnVsbCBkZWNvcmF0b3IuICovXG4gIHJldHVybiAob2JqZWN0OiBPYmplY3QsIGtleTogP3N0cmluZywgZGVzY3JpcHRvcjogP0Rlc2NyaXB0b3IpID0+IHtcbiAgICBpZiAoZGVzY3JpcHRvcikgcmV0dXJuIGRlc2NyaXB0b3JcbiAgICBpZiAob2JqZWN0KSByZXR1cm4gb2JqZWN0XG4gIH1cbn1cbiJdfQ==